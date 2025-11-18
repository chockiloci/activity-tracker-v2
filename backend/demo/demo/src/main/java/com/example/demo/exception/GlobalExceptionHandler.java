package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

// globalni handler za prestrezanje exceptionov v celotni aplikaciji
@ControllerAdvice 
public class GlobalExceptionHandler {

    // handler za MethodArgumentNotValidException
    @ExceptionHandler(MethodArgumentNotValidException.class) 
    // ta metoda se sproži, ko @Valid preverjanje pade
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>(); // map za hranjenje: ime polja -> napaka

        // vsak "error" predstavlja eno napako validacije
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField(); // ime polja, ki je sprožilo napako
            String message = error.getDefaultMessage(); // sporočilo napake iz anotacije
            errors.put(field, message); // shrani par (polje, napaka)
        });

        // vrne 400 (Bad Request) s seznamom napak
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST); 
    }
}