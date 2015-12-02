package <%=packageName%>.domain;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A fortune cookie.
 */
@Entity
@Table(name = "fortune")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fortune  implements Serializable {

    @Id
    private Long id;

    @Column(name = "message")
    private String message;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Fortune fortune = (Fortune) o;
        return Objects.equals(id, fortune.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Foo{" +
            "id=" + id +
            ", message='" + message + "'" +
            '}';
    }
}
