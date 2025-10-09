package white.monster.energy.adventurefrontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewTestController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/employee/bookings")
    public String employeeBookings() {
        return "employee-bookings";
    }

    @GetMapping("/admin/activities")
    public String adminActivities() {
        return "admin-activities";
    }

    @GetMapping("/employee/bookings/{id}")
    public String employeeBookingDetail() {
        return "employee-booking-detail";
    }
}
