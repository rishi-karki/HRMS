package Model;

/**
 * Created by Rishi on 7/7/17.
 */
public class Address {
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDisplay_name() {
        return display_name;
    }

    public void setDisplay_name(String display_name) {
        this.display_name = display_name;
    }

    public int getGeography_type() {
        return geography_type;
    }

    public void setGeography_type(int geography_type) {
        this.geography_type = geography_type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public int getParent_id() {
        return parent_id;
    }

    public void setParent_id(int parent_id) {
        this.parent_id = parent_id;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getLast_modified() {
        return last_modified;
    }

    public void setLast_modified(String last_modified) {
        this.last_modified = last_modified;
    }

    private int id;
    private String display_name;
    private int geography_type;
    private String value;
    private int parent_id;
    private String created;
    private String last_modified;

}
