package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import jakarta.validation.constraints.*;

@Entity // ta razred predstavlja JPA entiteto (tabelo v bazi)
@Table(name = "activity") // ime tabele v bazi
public class Activity {

    @Id // primarni ključ
    // avtomatsko generiranje ID (auto-increment v MySQL ipd.)
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    
    // polje ne sme biti prazno ali sestavljeno iz presledkov
    @NotBlank(message = "Ime aktivnosti je obvezno") 
    private String name;
    
    // opis aktivnosti (ni obvez in nima validacijske anotacije)
    private String description; 
    
    // datum ne sme biti v preteklosti
    @FutureOrPresent(message = "Datum mora biti danes ali v prihodnosti")
    private LocalDate date;
    
    // trajanje mora biti >= 1
    @Min(value = 1, message = "Trajanje mora biti vsaj 1 minuta")
    private Integer duration;
    
    // polje ne sme biti prazno
    @NotBlank(message = "Kategorija je obvezna")
    private String category;

    // getters in Setters (standardni dostopni metodi)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}