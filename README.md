# php-lead-generation

This project is a simple lead generation application built with PHP and HTML. It allows users to submit their contact information through a web form, which can then be processed and stored or used for notifications.

## Project Structure

```
php-lead-generation
├── public
│   ├── index.html          # HTML form for lead generation
│   └── submit-lead.php     # PHP script to handle form submissions
├── src
│   └── config
│       └── database.php    # Database connection configuration
├── .htaccess               # Server configuration for URL rewriting
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd php-lead-generation
   ```

2. **Configure the database**:
   - Open `src/config/database.php` and update the database connection settings (host, username, password, database name).

3. **Set up the server**:
   - Ensure you have a local server environment (like XAMPP, MAMP, or a live server) that supports PHP.
   - Place the project folder in the server's root directory (e.g., `htdocs` for XAMPP).

4. **Access the application**:
   - Open your web browser and navigate to `http://localhost/php-lead-generation/public/index.html` to view the lead generation form.

## Usage

- Fill out the form with your name, email, and phone number.
- Click the "Submit" button to send your information.
- The form submission will be handled by `submit-lead.php`, which processes the data accordingly.

## Additional Information

- Ensure that your server has the necessary permissions to execute PHP scripts and write to the database.
- You can customize the form and backend logic as needed to fit your requirements.