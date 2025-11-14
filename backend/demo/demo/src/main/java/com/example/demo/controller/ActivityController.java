package com.example.demo.controller;

import com.example.demo.model.Activity;
import com.example.demo.repository.ActivityRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityController {
    private final ActivityRepository repo;

    public ActivityController(ActivityRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Activity> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Activity add(@RequestBody Activity a) {
        return repo.save(a);
    }

    @PutMapping("/{id}")
    public Activity update(@PathVariable Long id, @RequestBody Activity a) {
        a.setId(id);
        return repo.save(a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
