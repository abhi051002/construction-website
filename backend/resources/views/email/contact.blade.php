<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Contact Email</title>
</head>

<body>
    <h2>You have recieve an enquire.</h2>
    <p>Name: {{ $mailData['name'] }}</p>
    <p>Email: {{ $mailData['email'] }}</p>
    <p>Phone: {{ $mailData['phone'] }}</p>
    <p>Subject: {{ $mailData['subject'] }}</p>
    <p>Message:</p>
    <p>{{ $mailData['message'] }}</p>

    <p>Thanks!!</p>
</body>

</html>
