import AWS from 'aws-sdk';

const SES_CONFIG = {
  accessKeyId: process.env.AWSKEY,
  secretAccessKey: process.env.AWSSECRET,
  region: 'us-west-2',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const Email = {
  send({to, content, subject, headers = []}){
    let params = {
      Source: '<info@readyfundgo.com>',
      Destination: {
        ToAddresses: [
          to
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: content,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
  }
}

export default Email;
