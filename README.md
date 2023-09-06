# Blogify

Blogify is a simple service-based application developed with ASP.NET Core Web API & Angular.

## To Begin

First, you should create database. For this , you must be located in the server directory.

Open Terminal and write this:

```csharp
cd src/server
```

After you need write this line:

```csharp
dotnet ef migrations add Initialize
```

Then you should write:

```csharp
dotnet ef database update
```

Now, your database created in server folder. Some seed data creating when database creating.

When you create database, you can be located the client folder. Open another terminal and write this:

```csharp
cd src/server
```

Before run client app you need install npm packages. Write this:

```typescript
npm install
```

And you can start client app:

```typescript
ng serve --open
```

## Important!

You need run client and server apps same times. For this open different terminals. You can use first terminal for run client app and you can use second terminal for run server app.

## Support

For support, email aheroglu@outlook.com
