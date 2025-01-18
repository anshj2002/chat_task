# ChatApp - Real-time Django Chat Application

Experience the future of communication with real-time messaging, enhanced security, and seamless connectivity.

## 🚀 Features

### Real-time Communication
- Real-time messaging using WebSocket technology
- Instant message delivery and updates
- Chat history preservation
- Smart presence indicators
- Unlimited message history retention

### User Interface
- Responsive design with adaptive page scaling
- Fixed navigation bar
- Three-panel layout (collapsible left menu, main content, right panel)
- Automatic page scaling based on screen width:
  - 992px-1600px: 90% scaling
  - 700px-767px: 80% scaling
  - 600px-700px: 75% scaling
  - ≤600px: 50% scaling

### Security & Authentication
- User registration and authentication system
- Secure login/logout functionality
- Military-grade encryption
- Multi-factor authentication
- Advanced data privacy controls
- 24/7 security monitoring

### User Experience
- Clean, intuitive interface
- Rich profile customization
- User list in collapsible left menu
- Easy user selection for chat initiation
- Seamless message history retrieval

## 🛠️ Technology Stack
- Backend: Django
- Database: SQLite3
- Real-time Communication: WebSocket
- Frontend: HTML, CSS, JavaScript
- Deployment: PythonAnywhere

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/anshj2002/chat_task.git
cd chat_task
```

2. Create and activate virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Apply database migrations
```bash
python manage.py migrate
```

5. Run the development server
```bash
python manage.py runserver
```

## 🌐 Deployment
The application is deployed on PythonAnywhere. You can access it at [your-pythonanywhere-link]

## 📁 Project Structure
```
chat_task/
├── accounts/            # User authentication app
├── chat_task/          # Main chat application
├── media/              # Media files
├── staticfiles/        # Static files
├── templates/          # HTML templates
├── manage.py
├── requirements.txt
└── README.md
```

## 💻 Usage
1. Register a new account or login with existing credentials
2. Access the user list from the collapsible left menu
3. Click on any user to start a chat
4. Send messages in real-time
5. View chat history automatically loaded in the conversation

## 🛡️ Environment Variables
Create a `.env` file in the root directory:
```
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 👥 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make changes and commit (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author
- [anshj2002](https://github.com/anshj2002)

## 🔗 Links
- [Live Demo](your-pythonanywhere-link)
- [GitHub Repository](https://github.com/anshj2002/chat_task)
