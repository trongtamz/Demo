FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

COPY src/Demo.Domain/Demo.Domain.csproj ./src/Demo.Domain/
COPY src/Demo.Application/Demo.Application.csproj ./src/Demo.Application/
COPY src/Demo.Infrastructure/Demo.Infrastructure.csproj ./src/Demo.Infrastructure/
COPY src/Demo.Api/Demo.Api.csproj ./src/Demo.Api/
RUN dotnet restore ./src/Demo.Api/Demo.Api.csproj

COPY . ./
RUN dotnet publish ./src/Demo.Api -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
EXPOSE 5432
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "Demo.Api.dll"]
