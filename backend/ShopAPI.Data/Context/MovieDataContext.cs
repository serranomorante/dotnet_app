using Microsoft.EntityFrameworkCore;
using ShopAPI.Data.Models;

public class MovieDataContext: DbContext
{
    public MovieDataContext(DbContextOptions<MovieDataContext> options): base(options)
    {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseSerialColumns();
    }

    public DbSet<Movie> Movies { get; set; }
    public DbSet<Actor> Actors { get; set; }
}