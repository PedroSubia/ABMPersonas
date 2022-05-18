package com.geco.desafio.resolucion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.geco.desafio.resolucion.entity.Persona;
import com.geco.desafio.resolucion.service.PersonaService;


@RestController
@CrossOrigin(origins = "*")
public class PersonaController {

	@Autowired
	private PersonaService personaService;

	@GetMapping("/personaList")
	public ResponseEntity<List<Persona>> getPersonaList() {
		return new ResponseEntity<List<Persona>>(personaService.getPersonaList(), HttpStatus.OK);
	}

	@GetMapping("/persona/{id}")
	public ResponseEntity<Persona> getPersona(@PathVariable Long id) {
		return new ResponseEntity<Persona>(personaService.getPersonaById(id), HttpStatus.OK);
	}

	@PostMapping("/persona/save")
	public ResponseEntity<Void> savePersona(@RequestBody Persona persona) {
		personaService.savePersona(persona);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping("/persona/update")
	public ResponseEntity<?> updatePersona(@RequestBody Persona persona){
		personaService.updatePersona(persona);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/persona/delete/{id}")
	public ResponseEntity<Void> deletePersona(@PathVariable Long id) {
		personaService.deletePersona(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

}