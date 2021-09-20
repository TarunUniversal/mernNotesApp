const express = require('express');
const router = express();
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const _ = require('lodash');
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID)

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({email});

  if(userExists){
    res.status(400)
    throw new Error("User Already Exists");
  }

  const token = jwt.sign({name, email, password, pic}, process.env.JWT_SECRET, {
    expiresIn: '10m'
  });

  const msg = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Account activation link',
    html: `
    <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		th.column {
			padding: 0
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		@media (max-width:660px) {
			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}
		}
	</style>
</head>
<body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #f8f8f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #1aa19c;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #1aa19c;" width="640">
<tbody>
<tr>
<th class="column" style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td>
<div align="center">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span></span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</th>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff;" width="640">
<tbody>
<tr>
<th class="column" style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td style="padding-bottom:25px;padding-top:22px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" style="line-height:10px"><img alt="Notas" src="https://res.cloudinary.com/tarununiversal/image/upload/v1632063994/notas_jexbmq.png" style="display: block; height: auto; border: 0; width: 128px; max-width: 100%;" title="Notas" width="128"/></div>
</td>
</tr>
</table>
</th>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff;" width="640">
<tbody>
<tr>
<th class="column" style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td style="padding-bottom:12px;padding-top:60px;">
<div align="center">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span></span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;" width="100%">
<tr>
<td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<div style="font-size: 12px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
<p style="margin: 0; font-size: 16px; text-align: center;"><span style="font-size:30px;color:#2b303a;"><strong>Verify Your Email Account</strong></span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;" width="100%">
<tr>
<td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="font-family: sans-serif">
<div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodati mat tempor incididunt ut labore et dolore magna aliqua.</span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center">
<!--[if mso]><a:roundrect xmlns:a="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://notas-mern.herokuapp.com/activate/${token}" style="height:62px;width:203px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#485785"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a href="https://notas-mern.herokuapp.com/activate/${token}" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#485785;border-radius:60px;width:auto;border-top:1px solid #485785;border-right:1px solid #485785;border-bottom:1px solid #485785;border-left:1px solid #485785;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; margin: 0; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>Confirm Your Email</strong></span></span></a>
<!--[if mso]></center></v:textbox></a:roundrect><![endif]-->
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td style="padding-bottom:12px;padding-top:60px;">
<div align="center">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span></span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</th>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #2b303a;" width="640">
<tbody>
<tr>
<th class="column" style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td>
<div align="center">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span></span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td style="padding-top:30px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" style="line-height:10px"><img alt="Notas" src="https://res.cloudinary.com/tarununiversal/image/upload/v1632063994/notas_jexbmq.png" style="display: block; height: auto; border: 0; width: 128px; max-width: 100%;" title="Alternate text" width="128"/></div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;" width="100%">
<tr>
<td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
<div style="font-family: sans-serif">
<div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 18px;"><span style="color:#95979c;font-size:12px;">Etiam quis tempus ex. Sed vitae ipsum suscipit, ultricies odio vitae, suscipit massa. Sed tempus ipsum eget diam aliquam maximus. Cras accumsan urna vel rutrum lobortis. Maecenas tristique purus vel ex tempor consequat. Curabitur dui massa, congue sed sem at, rhoncus imperdiet sem. Fusce ac orci fermentum, malesuada dolor a, cursus augue. Quisque porttitor sapien arcu, quis iaculis nisi faucibus eget. Vestibulum eu velit rhoncus, aliquam ante eget, tristique diam dui massa, congue sed sem at, rhoncus usce ac orci fermentum,.</span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div align="center">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span></span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;" width="100%">
<tr>
<td style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
<div style="font-family: sans-serif">
<div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; line-height: 1.2;">
<p style="margin: 0; font-size: 14px; text-align: center;"><span style="color:#95979c;font-size:12px;">Notas Copyright © 2021</span></p>
</div>
</div>
</td>
</tr>
</table>
</th>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>
    `
  }

  sgMail.send(msg)
        .then(sent => {
          return res.json({
            message : `Check your email to activate your account.`
          });
        })
        .catch(err => {
          return res.status(400)
          throw new Error("Something went wrong.")
        })

  // const user = await User.create({
  //   name,email,password,pic,
  // });

  // if(user){
  //   res.status(201).json({
  //     _id : user._id,
  //     name : user.name,
  //     email:user.email,
  //     isAdmin:user.isAdmin,
  //     pic:user.pic,
  //     token:generateToken(user._id)
  //   })
  // }
  // else{
  //   res.status(400)
  //   throw new Error("Error Occured");
  // }
 
});

const activateUser = asyncHandler(async (req,res) => {
  const token = req.params.id;

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if(err){
        return res.status(401)
        throw new Error("Your activation link has been expired, Please try again.")
      } else{
        const {name, email, password, pic} = jwt.decode(token);
        console.log(email);

        const user = new User({
          name, email, password, pic
        });
        user.save((err, user) => {
          if(err){
            return res.status(401).json({
              error: err
            })
          } else{
            console.log(user);
            return res.status(201).json({
              _id : user._id,
              name : user.name,
              email:user.email,
              isAdmin:user.isAdmin,
              pic:user.pic,
              token:generateToken(user._id)
            })
          }
        })
      }
    })
  } else{
    res.json({
      message: 'something went wrong please try again'
    });
  };
});


const authUser = asyncHandler(async (req, res) => {
  const { email, password} = req.body;

  const user = await User.findOne({email});
  if(user && (await user.matchPassword(password))) {
    res.json({
      _id : user._id,
      name : user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      pic:user.pic,
      token:generateToken(user._id)
    })
     
  } 
  else{
    res.status(400)
    throw new Error("Invalid Credentials");
  }
});

const updateuserProfile = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email});
    if(!user){
      res.status(400);
      throw new Error('User with this email id doesnot exist')
    }

    try {

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '10m'
      })

      const msg = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password reset link',
        html: `
        <!DOCTYPE html>

        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title></title>
        <meta charset="utf-8"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
            * {
              box-sizing: border-box;
            }
        
            th.column {
              padding: 0
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
        
            p {
              line-height: inherit
            }
        
            @media (max-width:660px) {
              .icons-inner {
                text-align: center;
              }
        
              .icons-inner td {
                margin: 0 auto;
              }
        
              .row-content {
                width: 100% !important;
              }
        
              .stack .column {
                width: 100%;
                display: block;
              }
            }
          </style>
        </head>
        <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #f8f8f9;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #1aa19c;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #1aa19c;" width="640">
        <tbody>
        <tr>
        <th class="column" style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td>
        <div align="center">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span></span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        </th>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff;" width="640">
        <tbody>
        <tr>
        <th class="column" style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td style="padding-bottom:25px;padding-top:22px;width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" style="line-height:10px"><img alt="Notas" src="https://res.cloudinary.com/tarununiversal/image/upload/v1632063994/notas_jexbmq.png" style="display: block; height: auto; border: 0; width: 128px; max-width: 100%;" title="Notas" width="128"/></div>
        </td>
        </tr>
        </table>
        </th>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff;" width="640">
        <tbody>
        <tr>
        <th class="column" style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td style="padding-bottom:12px;padding-top:60px;">
        <div align="center">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span></span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
        <div style="font-family: sans-serif">
        <div style="font-size: 12px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
        <p style="margin: 0; font-size: 16px; text-align: center;"><span style="font-size:30px;color:#2b303a;"><strong>Reset your password</strong></span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
        <div style="font-family: sans-serif">
        <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; line-height: 1.5;">
        <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodati mat tempor incididunt ut labore et dolore magna aliqua.</span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
        <div align="center">
        <!--[if mso]><a:roundrect xmlns:a="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://notas-mern.herokuapp.com/resetPassword/${token}" style="height:62px;width:203px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#485785"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]--><a href="https://notas-mern.herokuapp.com/resetPassword/${token}" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#485785;border-radius:60px;width:auto;border-top:1px solid #485785;border-right:1px solid #485785;border-bottom:1px solid #485785;border-left:1px solid #485785;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; margin: 0; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>Click here</strong></span></span></a>
        <!--[if mso]></center></v:textbox></a:roundrect><![endif]-->
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td style="padding-bottom:12px;padding-top:60px;">
        <div align="center">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span></span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        </th>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #2b303a;" width="640">
        <tbody>
        <tr>
        <th class="column" style="mso-table-lspace: 0; mso-table-rspace: 0; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td>
        <div align="center">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1AA19C;"><span></span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td style="padding-top:30px;width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" style="line-height:10px"><img alt="Notas" src="https://res.cloudinary.com/tarununiversal/image/upload/v1632063994/notas_jexbmq.png" style="display: block; height: auto; border: 0; width: 128px; max-width: 100%;" title="Alternate text" width="128"/></div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
        <div style="font-family: sans-serif">
        <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; line-height: 1.5;">
        <p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 18px;"><span style="color:#95979c;font-size:12px;">Etiam quis tempus ex. Sed vitae ipsum suscipit, ultricies odio vitae, suscipit massa. Sed tempus ipsum eget diam aliquam maximus. Cras accumsan urna vel rutrum lobortis. Maecenas tristique purus vel ex tempor consequat. Curabitur dui massa, congue sed sem at, rhoncus imperdiet sem. Fusce ac orci fermentum, malesuada dolor a, cursus augue. Quisque porttitor sapien arcu, quis iaculis nisi faucibus eget. Vestibulum eu velit rhoncus, aliquam ante eget, tristique diam dui massa, congue sed sem at, rhoncus usce ac orci fermentum,.</span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
        <div align="center">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span></span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word;" width="100%">
        <tr>
        <td style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
        <div style="font-family: sans-serif">
        <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; line-height: 1.2;">
        <p style="margin: 0; font-size: 14px; text-align: center;"><span style="color:#95979c;font-size:12px;">Notas Copyright © 2021</span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        </th>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table><!-- End -->
        </body>
        </html>
        `
      }

      sgMail.send(msg)
      .then(sent => {
        return res.json({
          message : `Check your email to reset password.`
        });
      })
      .catch(err => {
        return res.status(400);
        throw new Error("Something went wrong");
      })
      
    } catch (err) {
      return res.status(400);
      throw new Error("Something went wrong");
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const token = req.params.id;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    console.log(newPassword,"ok")

    if(newPassword !== confirmPassword){
      return res.status(400);
      throw new Error("Passwords doesn't match.");
    }

    if(token){
      console.log(token);
      jwt.verify(token, process.env.JWT_SECRET, async (err) => {
        if(err){
          return res.status(401)
          throw new Error("Something went wrong, Please try again.")
        }
        const {_id} = jwt.decode(token);
        try {
          const user = await User.findById({_id});
          console.log(_id);
          if(user){
            user.password = newPassword;
            await user.save();
            return res.status(201).json({
              message:' Password has been reset. '
            })
          }
        } catch (error) {
          return res.status(401)
          throw new Error("Something went wrong, Please try again.")
        }
      })
    } else{
      return res.status(401)
      throw new Error("Something went wrong, Please try again.")
    }

});

module.exports = { registerUser, activateUser, authUser, updateuserProfile, forgotPassword, resetPassword };

















// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, pic } = req.body;

//   const userExists = await User.findOne({email});

//   if(userExists){
//     res.status(400)
//     throw new Error("User Already Exists");
//   }
//   const user = await User.create({
//     name,email,password,pic,
//   });

//   if(user){
//     res.status(201).json({
//       _id : user._id,
//       name : user.name,
//       email:user.email,
//       isAdmin:user.isAdmin,
//       pic:user.pic,
//       token:generateToken(user._id)
//     })
//   }
//   else{
//     res.status(400)
//     throw new Error("Error Occured");
//   }
 
// });