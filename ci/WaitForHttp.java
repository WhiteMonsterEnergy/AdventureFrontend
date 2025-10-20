import java.net.HttpURLConnection;
import java.net.URL;

/**
 * A simple Java program that waits for an HTTP server to respond with status 200 OK.
 * It repeatedly attempts to connect to the specified URL until a timeout is reached.
 * Usage: java WaitForHttp [url] [timeoutSeconds]
 * Defaults: url=http://localhost:8080/, timeoutSeconds=30
 */
public class WaitForHttp {
    public static void main(String[] args) {
        // Read URL from first arg or default to localhost root
        String url = args.length > 0 ? args[0] : "http://localhost:8080/";
        // Read timeout seconds from second arg or default to 30
        int timeoutSeconds = args.length > 1 ? parseIntOrDefault(args[1], 30) : 30;
        // Milliseconds to sleep between attempts
        int sleepMs = 1000;
        // Compute end time in epoch ms
        long endTime = System.currentTimeMillis() + timeoutSeconds * 1000L;

        // Loop until timeout reached
        while (System.currentTimeMillis() < endTime) {
            try {
                // Build URL and open connection
                URL u = new URL(url);
                HttpURLConnection conn = (HttpURLConnection) u.openConnection();
                // Use HEAD to avoid downloading large bodies
                conn.setRequestMethod("HEAD");
                // Short timeouts to fail fast
                conn.setConnectTimeout(3000);
                conn.setReadTimeout(3000);
                // Trigger the request and read response code
                int code = conn.getResponseCode();
                // Read Content-Type header for helpful logs
                String ct = conn.getHeaderField("Content-Type");
                // Log status and optional content type
                System.out.println("HTTP " + code + (ct != null ? "  Content-Type: " + ct : ""));
                // Success condition: HTTP 200
                if (code == 200) {
                    System.out.println("Server is up");
                    System.exit(0); // exit 0 on success
                }
            } catch (Exception e) {
                // On exception, print a concise waiting message and continue retrying
                System.out.println("Waiting: " + e.getClass().getSimpleName() +
                        (e.getMessage() != null ? " - " + e.getMessage() : ""));
            }

            // Sleep between attempts; ignore interrupts
            try { Thread.sleep(sleepMs); } catch (InterruptedException ignored) {}
        }

        // If loop exits, the server did not respond in time — print to stderr and exit non-zero
        System.err.println("Server did not respond with HTTP 200 within " + timeoutSeconds + "s");
        System.exit(1);
    }

    // Safe integer parse helper: returns default on parse failure
    private static int parseIntOrDefault(String s, int def) {
        try { return Integer.parseInt(s); } catch (Exception e) { return def; }
    }
}
