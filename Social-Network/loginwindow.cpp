#include "loginwindow.h"
#include "profilewindow.h"
#include "ui_loginwindow.h"

LoginWindow::LoginWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::LoginWindow)
{
    ui->setupUi(this);
    ui->confirmLabel->hide();
    ui->confirmTextEdit->hide();
    ui->confirmButton->hide();

    network.readUsers("users.txt");
    network.readPosts("posts.txt");

    connect(ui->loginButton, &QPushButton::clicked, this, &LoginWindow::loginButtonClicked);

    // Set up the timer to update the clock every second
    QTimer *timer = new QTimer(this);
    connect(timer, &QTimer::timeout, this, &LoginWindow::updateClock);
    timer->start(1000); // Update every second
    updateClock();
}

void LoginWindow::updateClock() {
    QString currentTime = QDateTime::currentDateTime().toString("hh:mm:ss AP");
    ui->lcdClockLabel->setText(currentTime);  // Update the QLabel with the current time
}



// Activates login in button
// Switches to profile page
void LoginWindow::loginButtonClicked()
{
    static int count = 1;
    loginName = ui->loginTextEdit->toPlainText().toStdString();
    userId = network.getId(loginName);

    if (userId == -1) {
        std::string error_ = "Error " + std::to_string(count++) + ": Enter a valid name";
        ui->loginLabel->setText(QString::fromStdString(error_));
        ui->loginTextEdit->clear();
        return;
    }
    ui->loginTextEdit->clear();

    ui->loginButton->hide();
    ui->loginLabel->hide();
    ui->loginTextEdit->hide();

    confirmationPage();
}

void LoginWindow::confirmationPage()
{
    ui->confirmLabel->show();
    ui->confirmTextEdit->show();
    ui->confirmButton->show();
    connect(ui->confirmButton,
            &QPushButton::clicked,
            this,
            &LoginWindow::confirmButtonClicked);
}

void LoginWindow::confirmButtonClicked()
{
    ui->confirmLabel->hide();
    ui->confirmTextEdit->hide();
    ui->confirmButton->hide();

    std::string response = ui->confirmTextEdit->toPlainText().toStdString();
    if (response == "Y") {
        isLoggedInUser = true;
        loggedInUser = loginName;
        loggedInUserId = network.getId(loggedInUser);
    }
    auto *profileWindow = new ProfileWindow(loginName, userId, network, loggedInUser, loggedInUserId);
    profileWindow->show();
    this->close();
    profileWindow->showProfilePage(loginName, userId);
}

LoginWindow::~LoginWindow()
{
    delete ui;
}
