'use strict';

const AWS = require('aws-sdk');
const fs = require('fs');
const ses = new AWS.SES();

AWS.config.update({ region: 'us-east-1' });

module.exports.sendReminderDaily = (event, context, callback) => {
  const emailHTML = fs.readFileSync('./views/dailyReminder.html', 'utf-8');
  const toAndFromAddress = 'arturo.estrada@ipointsystems.com';
  const params = {
    Destination: {
      ToAddresses: [toAndFromAddress]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailHTML
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'Remember to continue to do such and such thing'
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'A Reminder'
      }
    },
    ReplyToAddresses: [toAndFromAddress],
    Source: toAndFromAddress
  }

  ses.sendEmail(params, (err, data) => {
    if (err) console.error(err, err.stack);
    else callback(null, data);
  });
};

module.exports.sendReminderWeekend = (event, context, callback) => {
  const emailHTML = fs.readFileSync('./views/weekendReminder.html', 'utf-8');
  const toAndFromAddress = 'arturo.estrada@ipointsystems.com';
  const params = {
    Destination: {
      ToAddresses: [toAndFromAddress]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailHTML
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'Remember to continue to do such and such thing during the weekend'
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'A Reminder'
      }
    },
    ReplyToAddresses: [toAndFromAddress],
    Source: toAndFromAddress
  }

  ses.sendEmail(params, (err, data) => {
    if (err) console.error(err, err.stack);
    else callback(null, data);
  });
}
