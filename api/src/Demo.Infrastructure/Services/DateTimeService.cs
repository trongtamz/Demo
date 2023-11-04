using System.Diagnostics.CodeAnalysis;
using Demo.Application.Interfaces.Services;

namespace Demo.Infrastructure.Services;

[ExcludeFromCodeCoverage]
public class DateTimeService : IDateTimeService
{
    public DateTime UtcNow => DateTime.UtcNow;
}
