package <%=packageName%>.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import <%=packageName%>.domain.Fortune;

/**
 * Spring Data JPA repository for the Fortune entity.
 */
public interface FortuneRepository extends JpaRepository<Fortune,Long> {

}
