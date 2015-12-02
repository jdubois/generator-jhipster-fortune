package <%=packageName%>.web.rest;

import java.util.*;
import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.codahale.metrics.annotation.Timed;

import <%=packageName%>.domain.Fortune;
import <%=packageName%>.repository.FortuneRepository;

/**
 * REST controller for managing fortune cookies.
 */
@RestController
@RequestMapping("/api")
public class FortuneResource {

    private final Logger log = LoggerFactory.getLogger(FortuneResource.class);

    @Inject
    private FortuneRepository fortuneRepository;

    /**
     * GET  /fortune -> get the a random fortune cookie.
     */
    @RequestMapping(value = "/fortune",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Fortune> getFortune() {
        log.debug("REST request to get a fortune cookie");
        List<Fortune> fortunes = fortuneRepository.findAll();
        Collections.shuffle(fortunes);
        return Optional.ofNullable(fortunes.get(0))
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
