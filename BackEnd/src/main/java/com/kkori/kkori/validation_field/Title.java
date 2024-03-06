package com.kkori.kkori.validation_field;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
@Getter
@NoArgsConstructor
public class Title {

    @Column(nullable = false)
    private String title;

    public Title(String title) {
        validate(title);
        this.title = title;
    }

    private void validate(String title) {
        validateTitleNotEmpty(title);
    }

    private void validateTitleNotEmpty(String title) {
        if (Objects.isNull(title) || title.isEmpty()) {
            throw new IllegalArgumentException("빈 칸 이어서는 안됩니다.");
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Title that = (Title) o;
        return Objects.equals(title, that.title);
    }

    public String value() {
        return this.title;
    }


    @Override
    public int hashCode() {
        return Objects.hash(title);
    }
}
