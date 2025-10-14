package white.monster.energy.adventurefrontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewTestController {

    // Root loader
    @GetMapping("/")
    public String index() {
        return "index";
    }

    // Fallbacks: server den samme index.html for “dybe” URLs,
    // så frontend-JS håndterer visningen
    @GetMapping({
        "/employee/bookings",
        "/employee/bookings/{id}",
        "/admin/activities",
        "/aktiviteter",
        "/priser",
        "/kontakt",
        "/login"
    })
    public String spaFallback() {
        return "index";
    }
}
