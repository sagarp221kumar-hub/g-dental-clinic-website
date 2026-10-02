mixin () {
  public query func getApiDoc() : async Text {
    "# Dental Clinic Backend API\n\n" #
    "This backend stores appointment requests submitted through the clinic's single-page website and exposes them for review.\n\n" #
    "## Public methods\n\n" #
    "### `submitAppointment(name, phone, preferredDate, preferredTime, message) : async Appointment`\n\n" #
    "Stores a new appointment request and returns the stored record.\n\n" #
    "- **Auth**: callable by anyone, including anonymous callers. The caller's principal is not recorded on the appointment.\n" #
    "- **Parameters** (all `Text`): `name`, `phone`, `preferredDate`, `preferredTime`, `message`. `preferredDate` and `preferredTime` are free-form text chosen by the visitor; no date parsing or validation is performed.\n" #
    "- **Returns**: the created `Appointment` record, including the server-assigned `id` and `createdAt`.\n" #
    "- **Idempotency**: not idempotent. Each call creates a new appointment with a fresh incrementing `id`; retrying a call that appeared to fail will create a duplicate request.\n" #
    "- **Errors**: none for normal input. Empty strings are accepted.\n\n" #
    "### `listAppointments() : async [Appointment]`\n\n" #
    "Returns every stored appointment request.\n\n" #
    "- **Auth**: open query endpoint; callable by anyone, including anonymous callers.\n" #
    "- **Returns**: an array of `Appointment` records. Order is unspecified.\n" #
    "- **Note**: this is a query call, so it reads the latest replicated state but does not mutate anything.\n\n" #
    "## Types\n\n" #
    "```\n" #
    "Appointment = {\n" #
    "  id : Nat;              // server-assigned, starts at 0 and increments by 1\n" #
    "  name : Text;\n" #
    "  phone : Text;\n" #
    "  preferredDate : Text;\n" #
    "  preferredTime : Text;\n" #
    "  message : Text;\n" #
    "  createdAt : Nat;       // nanoseconds since the Unix epoch (IC Time.now())\n" #
    "}\n" #
    "```\n\n" #
    "## Units and encodings\n\n" #
    "- `createdAt` is a `Nat` count of **nanoseconds** since the Unix epoch, as returned by the Internet Computer's `Time.now()`.\n" #
    "- `id` is a `Nat` starting at `0` for the first submission.\n" #
    "- All other fields are UTF-8 `Text`.\n\n" #
    "## Authentication and identity\n\n" #
    "No method requires a signed-in caller. The app's frontend pins an Internet Identity derivation origin, published at `/.well-known/ii-derivation-origin` when available; an agent already holding the user's Internet Identity authorization derives the correct per-app principal against that origin (for example `icp identity link web <name> --app <host>`). Such a delegation acts with the user's full authority in this app until it expires. Because `submitAppointment` and `listAppointments` are open, no registration step is required to call them.\n\n" #
    "## Integration notes\n\n" #
    "- `submitAppointment` is an update call and must be awaited; it persists state.\n" #
    "- `listAppointments` is a query call and returns quickly without consensus.\n" #
    "- There is no delete, update, or status endpoint; appointments are append-only from the API's perspective.\n";
  };
};
