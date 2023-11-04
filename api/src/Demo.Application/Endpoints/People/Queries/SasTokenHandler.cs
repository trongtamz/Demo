using AutoMapper;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Demo.Application.Interfaces.Persistence.DataServices.People.Queries;
using MediatR;
using Microsoft.Extensions.Options;

namespace Demo.Application.Endpoints.People.Queries;

public class SasTokenHandler : IRequestHandler<SasTokenQuery, string>
{
    private readonly BlobConnectionSettings _connectionSettings;
    public readonly IGetPeopleDataService _getPeopleDataService;
    public readonly IMapper _mapper;

    public SasTokenHandler(IGetPeopleDataService getPeopleDataService, IMapper mapper,
        IOptions<BlobConnectionSettings> connectionSettings)
    {
        _connectionSettings = connectionSettings.Value;
        _getPeopleDataService = getPeopleDataService;
        _mapper = mapper;
    }

    public async Task<string> Handle(SasTokenQuery request, CancellationToken cancellationToken = default)
    {
        var storageSharedKeyCredential = new StorageSharedKeyCredential(_connectionSettings.StorageAccount, _connectionSettings.Key);
        var blobServiceClient = new BlobServiceClient(new Uri($"https://{_connectionSettings.StorageAccount}.blob.core.windows.net"), storageSharedKeyCredential);
        var containerClient = blobServiceClient.GetBlobContainerClient("files");

        //set properties on BlobSasBuilder class
        var sasBuilder = new BlobSasBuilder()
        {
            StartsOn = DateTimeOffset.UtcNow,
            ExpiresOn = DateTimeOffset.UtcNow.AddHours(1), // Expiration time for the SAS token
        };

        // set the required permissions on the SAS token
        if (request.BlobSasPermissions.HasValue)
        {
            sasBuilder.SetPermissions(request.BlobSasPermissions.Value);
        }
        else
        {
            sasBuilder.SetPermissions(BlobSasPermissions.All);
        }
        sasBuilder.Resource = "c";
        var sasToken = containerClient.GenerateSasUri(sasBuilder);

        return sasToken.ToString();
    }
}
