package Model;

/**
 * Created by Rishi on 7/10/17.
 */
public class EmployeeAddress {
    private int id;
    private int permanentAddressId;
    private int temporaryAddressID;
    private String permanentTole;
    private String temporaryTole;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPermanentAddressId() {
        return permanentAddressId;
    }

    public void setPermanentAddressId(int permanentAddressId) {
        this.permanentAddressId = permanentAddressId;
    }

    public int getTemporaryAddressID() {
        return temporaryAddressID;
    }

    public void setTemporaryAddressID(int temporaryAddressID) {
        this.temporaryAddressID = temporaryAddressID;
    }

    public String getPermanentTole() {
        return permanentTole;
    }

    public void setPermanentTole(String permanentTole) {
        this.permanentTole = permanentTole;
    }

    public String getTemporaryTole() {
        return temporaryTole;
    }

    public void setTemporaryTole(String temporaryTole) {
        this.temporaryTole = temporaryTole;
    }


}
