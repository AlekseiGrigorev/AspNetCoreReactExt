#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM aleksvgrig/dotnet-sdk-6.0-nodejs-npm
WORKDIR /src
COPY ["AspNetCoreReactExt.csproj", "."]
RUN dotnet restore "./AspNetCoreReactExt.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "AspNetCoreReactExt.csproj" -c Debug -o /app/build
RUN dotnet publish "AspNetCoreReactExt.csproj" -c Debug -o /app/publish /p:UseAppHost=false

EXPOSE 7083
EXPOSE 5252

ENTRYPOINT ["dotnet", "/app/publish/AspNetCoreReactExt.dll",  "--urls", "http://*:5252;https://*:7083"]