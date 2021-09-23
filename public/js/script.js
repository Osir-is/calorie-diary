// CHECK THE LOGIN
const loginValidation = () => {
    const email = $('#email').val();
    const name = $('#name').val();
    const regexSimple = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
    if (name === '' || name === null) {
        $('#errorName').removeClass('hide');
        return false;
    } else {
        $('#errorName').removeClass('show');
        $('#errorName').addClass('hide');
    }
    if (email === '' || email === null) {
        $('#errorEmail').removeClass('hide');
        return false;
    } else {
        $('#errorEmail').removeClass('show');
        $('#errorEmail').addClass('hide');
    }
    if (!email.match(regexSimple)) {
        $('#errorEmail2').removeClass('hide');
        return false;
    } else {
        $('#errorEmail2').removeClass('show');
        $('#errorEmail2').addClass('hide');
    }
    return true;
};

$('#loginBtn').on('click', (event) => {
    if (loginValidation() === false) {
        event.preventDefault();
    } else {
        event.preventDefault();
        let userId;
        const data = {
            email: $('#email').val(),
            name: $('#name').val(),
            userId,
        };
        $.ajax({
            type: 'POST',
            url: '/login',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                localStorage.setItem('userId', response.userId);
                window.location = `/dashboard/${response.userId}`;
            },
            error: function(err) {
                console.log(`Error ${err}`);
            },
        });
    }
});

// VALIDATION CHECK FOR DASHBOARD FORM

const formValidation = () => {
    const mood = $('#breakfast').text();
    const water = $('#breakfastcl').val();
    const mood = $('#lunch').text();
    const water = $('#lunchcl').val();
    const steps = $('#dinner').val();
    const sleep = $('#dinnercl').val();
    const exercise = $('#snacks').val();
    const calorie = $('#snackscl').val();

    if (breakfast === '' || breakfast === null) {
        $('#errorForm').removeClass('hide');
        return false;
    } else {
        $('#errorForm').removeClass('hide');
    }
    if (breackfastcl === '' || breakfastcl === null) {
        $('#errorForm').removeClass('hide');
        return false;
    } else {
        $('#errorForm').removeClass('show');
        $('#errorForm').addClass('hide');
    }
    if (lunch === '' || lunch === null) {
        $('#errorForm').removeClass('hide');
        return false;
    } else {
        $('#errorForm').removeClass('show');
        $('#errorForm').addClass('hide');
    }
    if (lunchcl === '' || lunchcl === null) {
        $('#errorForm').removeClass('hide');
        return false;
    } else {
        $('#errorForm').removeClass('show');
        $('#errorForm').addClass('hide');
    }
    if (dinner === '' || dinner === null) {
        $('#errorForm').removeClass('hide');
        return false;
    } else {
        $('#errorForm').removeClass('show');
        $('#errorForm').addClass('hide');
    }
    if (dinnercl === '' || dinnercl === null) {
        $('#errorForm').removeClass('hide');
        return false;
    } else {
        $('#errorForm').removeClass('show');
        $('#errorForm').addClass('hide');
    }
    if (snacks === '' || snacks === null) {
        $('#errorForm').removeClass('hide');
        return false;
    } else {
        $('#errorForm').removeClass('show');
        $('#errorForm').addClass('hide');
    }
    if (snackscl === '' || snackscl === null) {
        $('#errorForm').removeClass('hide');
        return false;
    } else {
        $('#errorForm').removeClass('show');
        $('#errorForm').addClass('hide');
    }
    return true;
};

// USER DASHBOARD POST REQUEST
$('#submitBtn').on('click', (event) => {
    if (formValidation() === false) {
        event.preventDefault();
    } else {
        event.preventDefault();
        const data = {
            breakfast: $('#breakfast').text(),
            breakfastcl: $('#breakfastcl').val(),
            lunch: $('#lunch').val(),
            lunchcl: $('#lunchcl').val(),
            dinner: $('#dinner').val(),
            dinnercl: $('#dinnercl').val(),
            snacks: $('#snacks').val(),
            snackscl: $('#snackscl').val(),
        };
        const userId = localStorage.getItem('userId');
        console.log(`data values ${data}`);
        $.ajax({
            type: 'POST',
            url: `/dashboard/${userId}`,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                console.log(`sent ${response}`);
                if (response.redirect) {
                    window.location = response.redirect;
                }
            },
            error: function(err) {
                console.log(`Error ${err}`);
            },
        });
    }
});


// DELETE REQUEST FOR USER DATA
$('#deleteBtn').on('click', (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    $.ajax({
        type: 'DELETE',
        url: `/board/${userId}`,
        contentType: 'application/json',
        success: function(response) {
            localStorage.removeItem('userId', response.userId);
            window.location = '/';
        },
        error: function(err) {
            console.log(`Error ${err}`);
        },
    });
});