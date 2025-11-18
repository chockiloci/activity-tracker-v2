package com.example.demo.controller;

import com.example.demo.model.Activity;
import com.example.demo.repository.ActivityRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;

@RestController // označi razred kot REST kontroler
@RequestMapping("/api/activities") // osnovna pot za vse metode v tem kontrolerju
@CrossOrigin(origins = "http://localhost:3000") // dovoli CORS za frontend na portu 3000
public class ActivityController {
    private final ActivityRepository repo; // repo za delo z bazo

    // konstruktor z dependency injection za repo
    public ActivityController(ActivityRepository repo) {
        this.repo = repo;
    }

    // vrne vse aktivnosti
    @GetMapping
    public List<Activity> getAll() { 
        return repo.findAll();
    }

    // doda novo aktivnost
    @PostMapping
    public Activity add(@Valid @RequestBody Activity a) { 
        return repo.save(a);
    }

    // posodobitev obstoječe aktivnosti
    @PutMapping("/{id}")
    public Activity update(@PathVariable Long id, @Valid @RequestBody Activity a) { // posodobitev obstoječe aktivnosti
        a.setId(id); // nastavi ID, da se shrani kot posodobitev
        return repo.save(a);
    }

    // doda novo aktivnost
    @PostMapping("/activities")
    public ResponseEntity<Activity> createActivity(@Valid @RequestBody Activity activity) { 
        // doda novo aktivnost, vendar z drugo potjo in ResponseEntity
        Activity saved = repo.save(activity);
        return ResponseEntity.ok(saved);
    }

    // izbriše aktivnost po ID-ju
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { 
        repo.deleteById(id);
    }
}