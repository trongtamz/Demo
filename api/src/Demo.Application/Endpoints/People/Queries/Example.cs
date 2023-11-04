using AutoMapper;
using Demo.Application.Interfaces.Persistence.DataServices.People.Queries;
using Microsoft.Extensions.Options;

namespace Demo.Application.Endpoints.People.Queries;

public class Example
{
    private readonly BlobConnectionSettings _connectionSettings;
    public readonly IGetPeopleDataService _getPeopleDataService;
    public readonly IMapper _mapper;

    public Example(IGetPeopleDataService getPeopleDataService, IMapper mapper,
        IOptions<BlobConnectionSettings> connectionSettings)
    {
        _connectionSettings = connectionSettings.Value;
        _getPeopleDataService = getPeopleDataService;
        _mapper = mapper;
    }

    //public async Task<IEnumerable<PersonViewModel>> Handle(PeopleQuery request, CancellationToken cancellationToken = default)
    //{
    //    var people = await _getPeopleDataService.ExecuteAsync(request.IncludeInactive, cancellationToken);
    //    var results = _mapper.Map<IEnumerable<PersonViewModel>>(people);

    //    var storageSharedKeyCredential = new StorageSharedKeyCredential(_connectionSettings.StorageAccount, _connectionSettings.Key);
    //    var blobServiceClient = new BlobServiceClient(new Uri($"https://{_connectionSettings.StorageAccount}.blob.core.windows.net"), storageSharedKeyCredential);
    //    var containerClient = blobServiceClient.GetBlobContainerClient("files");

    //    //set properties on BlobSasBuilder class
    //    var sasBuilder = new BlobSasBuilder()
    //    {
    //        StartsOn = DateTimeOffset.UtcNow,
    //        ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(1), // Expiration time for the SAS token
    //    };

    //    //// set the required permissions on the SAS token
    //    sasBuilder.SetPermissions(BlobSasPermissions.All);
    //    sasBuilder.Resource = "c";
    //    //var sasToken = sasBuilder.ToSasQueryParameters(storageSharedKeyCredential).ToString();
    //    var sasToken = containerClient.GenerateSasUri(sasBuilder);

    //    //CloudStorageAccount storageAccount = CloudStorageAccount.Parse(_connectionSettings.BlobStorageConnection);
    //    //CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
    //    //CloudBlobContainer container = blobClient.GetContainerReference("files");
    //    //var isExists = await container.ExistsAsync();
    //    //if (!isExists)
    //    //{
    //    //    await container.CreateAsync();
    //    //}
    //    //string sasToken = container.GetSharedAccessSignature(new SharedAccessBlobPolicy
    //    //{
    //    //    Permissions = SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.List,
    //    //    SharedAccessExpiryTime = DateTime.UtcNow.AddSeconds(60) // set the expiry time for the SAS token
    //    //});
    //    UriBuilder fulluri = new UriBuilder()
    //    {
    //        Scheme = _connectionSettings.Schema,
    //        Host = $"{_connectionSettings.StorageAccount}.blob.core.windows.net",
    //        Query = sasToken.ToString()
    //    };
    //    //SharedAccessBlobPolicy sharedPolicy = new SharedAccessBlobPolicy
    //    //{
    //    //    Permissions = SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.List
    //    //};
    //    //BlobContainerPermissions perms = await container.GetPermissionsAsync();
    //    //perms.SharedAccessPolicies.Add("testShare", sharedPolicy);

    //    //await container.SetPermissionsAsync(perms);
    //    //var sasToken = container.GetSharedAccessSignature(sharedPolicy);

    //    foreach (var item in results)
    //    {
    //        //item.Token = $"https://smithseedqa.blob.core.windows.net{sasToken}";

    //        //item.Token = $"https://smithseedqa.blob.core.windows.net/files?sp=rl&st=2024-01-21T04:44:42Z&se=2024-01-21T12:44:42Z&sv=2022-11-02&sr=c&sig=xgw0QLaJSumIkltsF5vC2Fx80QTfy0OS1mYQZlkr9TA%3D";
    //        item.Token = sasToken;
    //        //item.Token = fulluri.Uri;
    //    }

    //    return results;
    //}
}
