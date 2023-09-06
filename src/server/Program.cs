using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Data.Seed;
using server.Data.Services;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<BlogifyContext>(p => p.UseSqlite("Data Source = social.db"));
builder.Services.AddTransient<SeedArticles>();
builder.Services.AddIdentity<AppUser, AppRole>().AddEntityFrameworkStores<BlogifyContext>();
builder.Services.AddCors(option =>
{
    option.AddPolicy(
        name: "AppCors",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
builder.Services.AddAuthentication(p =>
{
    p.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    p.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(p =>
{
    p.RequireHttpsMetadata = false;
    p.SaveToken = true;
    p.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("AppSettings:Secret").Value)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<ArticleService>();
builder.Services.AddScoped<AboutService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddScoped<MessageService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AppCors");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// Seed datas
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<BlogifyContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();

    SeedArticles.Initialize(context);
    SeedAbout.Initialize(context);
    SeedUser.Initialize(userManager);
}

app.Run();
