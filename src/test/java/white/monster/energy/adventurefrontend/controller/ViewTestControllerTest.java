package white.monster.energy.adventurefrontend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

/** Test class for ViewTestController to verify that the correct views are returned for specific endpoints. */
@WebMvcTest(ViewTestController.class)
public class ViewTestControllerTest {

    // MockMvc to simulate HTTP requests and assert responses
    @Autowired
    private MockMvc mockMvc;

    /** Test that a GET request to the root URL ("/") returns the "index" view. */
    @Test
    void index_returnsIndexView() throws Exception {
        // Arrange: No setup required

        // Act: Perform GET request to "/"
        var result = mockMvc.perform(get("/"));

        // Assert: Verify status is OK and view name is "index"
        result.andExpect(status().isOk())
                .andExpect(view().name("index"));
    }

    /** Test that a GET request to "/login" returns the "index" view as a fallback. */
    @Test
    void loginFallback_returnsIndexView() throws Exception {
        // Arrange: No setup required

        // Act: Perform GET request to "/login"
        var result = mockMvc.perform(get("/login"));

        // Assert: Verify status is OK and view name is "index"
        result.andExpect(status().isOk())
                .andExpect(view().name("index"));
    }
}
