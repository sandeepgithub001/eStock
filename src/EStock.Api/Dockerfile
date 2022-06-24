#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["EStock.Api/EStock.Api.csproj", "EStock.Api/"]
COPY ["EStock.Services/EStock.Services.csproj", "EStock.Services/"]
COPY ["EStock.DataAccess/EStock.DataAccess.csproj", "EStock.DataAccess/"]
COPY ["EStock.Models/EStock.Models.csproj", "EStock.Models/"]
RUN dotnet restore "EStock.Api/EStock.Api.csproj"
COPY . .
WORKDIR "/src/EStock.Api"
RUN dotnet build "EStock.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EStock.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EStock.Api.dll"]
