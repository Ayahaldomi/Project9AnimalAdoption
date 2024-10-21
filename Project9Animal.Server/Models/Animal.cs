using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class Animal
{
    public int AnimalId { get; set; }

    public string Name { get; set; } = null!;

    public string Species { get; set; } = null!;

    public string? Breed { get; set; }

    public int? Age { get; set; }

    public string? Size { get; set; }

    public string? Temperament { get; set; }

    public string? SpecialNeeds { get; set; }

    public string? Description { get; set; }

    public string? AdoptionStatus { get; set; }

    public string? Image1 { get; set; }

    public string? Image2 { get; set; }

    public string? Image3 { get; set; }

    public string? Image4 { get; set; }

    public virtual ICollection<AdoptionApplication> AdoptionApplications { get; set; } = new List<AdoptionApplication>();

    public virtual ICollection<ShelterAnimal> ShelterAnimals { get; set; } = new List<ShelterAnimal>();

    public virtual ICollection<SuccessStory> SuccessStories { get; set; } = new List<SuccessStory>();
}
