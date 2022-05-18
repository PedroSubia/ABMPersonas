package com.geco.desafio.resolucion.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geco.desafio.resolucion.entity.Persona;
import com.geco.desafio.resolucion.repository.PersonaRepository;

@Service
public class PersonaService {
	@Autowired
	private PersonaRepository personaRepository;

	public List<Persona> getPersonaList() {
		return personaRepository.findAll();
	}

	public Persona getPersonaById(Long id) {
		return personaRepository.findById(id).get();
	}

	public void savePersona(Persona persona) {
		personaRepository.save(persona);
	}
	
	public void deletePersona(Long id) {
		personaRepository.deleteById(id);
	}
	
	public Persona updatePersona(Persona persona) {
		//Persona original = personaRepository.findById(persona.getId()).get();
		return personaRepository.save(persona);
	}
	
}
