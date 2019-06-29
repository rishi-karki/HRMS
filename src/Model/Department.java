package Model;

/**
 * Created by Rishi on 18/07/2017.
 */
public class Department {
    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDepartment_name() {
        return department_name;
    }

    public void setDepartment_name(String department_name) {
        this.department_name = department_name;
    }

    public int getManager() {
        return manager;
    }

    public void setManager(int manager) {
        this.manager = manager;
    }

    public int getStatus_id() {
        return status_id;
    }

    public void setStatus_id(int status_id) {
        this.status_id = status_id;
    }


    private int id;
    private String department_name;
    private int manager;
    private int status_id;
    private String managerName;

    public String getDepartmentStatusName() {
        return departmentStatusName;
    }

    public void setDepartmentStatusName(String departmentStatusName) {
        this.departmentStatusName = departmentStatusName;
    }

    private String departmentStatusName;

}
