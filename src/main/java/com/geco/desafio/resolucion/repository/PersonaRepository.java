package com.geco.desafio.resolucion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.geco.desafio.resolucion.entity.Persona;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {
	
}