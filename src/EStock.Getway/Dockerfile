#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["EStock.Getway/EStock.Getway.csproj", "EStock.Getway/"]
RUN dotnet restore "EStock.Getway/EStock.Getway.csproj"
COPY . .
WORKDIR "/src/EStock.Getway"
RUN dotnet build "EStock.Getway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EStock.Getway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EStock.Getway.dll"]
