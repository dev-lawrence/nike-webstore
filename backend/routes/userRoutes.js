import express from 'express';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.post(
  '/',
  bodyParser.raw({ type: 'application/json' }),
  async function (req, res) {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);
      const { data } = evt;

      // Handle the webhook
      const eventType = evt.type;
      if ((eventType === 'user.created') | (eventType === 'user.updated')) {
        // console.log(`User ${data.id} was ${eventType}`);
        console.log(`Here are the attributes ${JSON.stringify(data)}`);

        const firstEmailAddress =
          data.email_addresses && data.email_addresses[0]
            ? data.email_addresses[0].email_address
            : null;

        const firstName = data.first_name;
        const lastName = data.last_name;

        const existingUser = await User.findOne({ clerkUserId: data.id });

        if (existingUser) {
          // Update the existing user's information
          (existingUser.name = firstName),
            (existingUser.email = firstEmailAddress),
            (existingUser.lastName = lastName);
          await existingUser.save();
          console.log(`User ${data.id} updated in the database`);
        } else {
          // Insert user data to database
          const user = new User({
            clerkUserId: data.id,
            name: firstName,
            lastName: lastName,
            email: firstEmailAddress,
          });

          await user.save();
          console.log('User saved to database');
        }
      }

      res.status(200).json({
        success: true,
        message: 'Webhook received',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

userRouter.get('/', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

export default userRouter;
