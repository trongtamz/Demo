using Azure.Storage.Sas;
using MediatR;

namespace Demo.Application.Endpoints.People.Queries;

public class SasTokenQuery : IRequest<string>
{
    public bool IncludeInactive { get; init; } = false;
    public string? BlobSubFolderName { get; init; }
    public BlobSasPermissions? BlobSasPermissions { get; set; }
}
