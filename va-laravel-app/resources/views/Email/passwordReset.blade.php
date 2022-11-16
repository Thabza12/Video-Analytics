@component('mail::message')
# Change password

Click on button to reset password

@component('mail::button', [$url = route('http://localhost:4200/response-reset',['token'])])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
