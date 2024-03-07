var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var connection = require('./connection')
var mongo = require('mongodb')
var fileupload=require('express-fileupload')
var path = require('path');
const { ObjectId } = require('mongodb')
var session = require('express-session')
const paymentRoutes = require("./Routes/payment");
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(fileupload())
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'abc',
resave:true,
saveUninitialized:true}))


app.post('/register', async (req, res) => {
	  let info = {
		name: req.body.name,
		email: req.body.email,
		status:req.body.registerAs,
		password: req.body.pass,
	  };
  
	  const db = await connection;
	  await db.collection('Register').insertOne(info);
	  res.json({ success: true, message: 'Registration successful' });
  });

app.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;

        const db = await connection;
        const user = await db.collection('Register').findOne({ email });

        if (user) {
            if (pass === user.password) {
                const userDetails = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    mobile: user.mobile || '',
                    address: user.address || '',
                    image: user.image || ''
                };

                res.json({
                    success: true,
                    message: 'Login successful',
                    userDetails,
                });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Not a registered user' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/categoryinsert', (req, res) => {
	let details = {
		Categoryname :req.body.category,
	}
	connection.then((db) => {
		db.collection('Category').insertOne(details).then((result) => {
			res.json(result)
			console.log(result)
		})
	})
})

app.get('/category', (req, res) => {
	connection.then((db) => {
	  db.collection('Category').find({}).toArray()
		.then((result) => {
		  res.json(result);
		})
	});
  });

app.post('/sellerproductinsert/:name', (req, res) => {
    const { product, description, minamount, date, category } = req.body;
    const imageFiles = req.files;
	const name=req.params.name
    if (!imageFiles) {
        return res.status(400).json({ error: 'No files uploaded' });
		
    }
    const imageFilesArray = Object.values(imageFiles);

    const details = {
        ProductName: product,
        Description: description,
        Minamount: minamount,
        Date: date,
        Category: category,
        Images: imageFilesArray.map(file => file.name),
		Username:name
    };
    imageFilesArray.forEach(file => {
        file.mv("./public/" + file.name);
    });

    connection.then((db) => {
        db.collection('SellerProduct').insertOne(details).then((result) => {
            res.json(result);
        });
    });
});


app.get('/viewproduct', (req, res) => {
	connection.then((db) => {
	  db.collection('SellerProduct').find({}).toArray()
		.then((result) => {
		  res.json(result);
		//   console.log(result)
		})
	});
  });
  app.post('/viewproductbyid', (req, res) => {
	let find_id = req.body.id;
	connection.then((db) => {
		db.collection('SellerProduct').findOne({ _id: new mongo.ObjectId(find_id) }).then((results) => {
			res.json(results)
		})
	})
}) 
  
app.post('/approveproduct/:id', (req, res) => {
    const productId = req.params.id;
    
    connection.then((db) => {
        db.collection('SellerProduct').updateOne(
            { _id: new mongo.ObjectId(productId) },
            { $set: { status: 1 } }
        ).then((result) => {
            res.json(result);
        });
    });
});

app.post('/rejectproduct/:id', (req, res) => {
    const productId = req.params.id;
    
    connection.then((db) => {
        db.collection('SellerProduct').updateOne(
            { _id: new mongo.ObjectId(productId) },
            { $set: { status: 0 } }
        ).then((result) => {
            res.json(result);
        });
    });
});

app.post('/deleteproduct', (req, res) => {
	let delete_id = req.body.id;
	connection.then((db) => {
		db.collection('SellerProduct').deleteOne({ _id: new mongo.ObjectId(delete_id) }).then((result) => {
			res.json(result)
		})
	})
})

app.post('/editproductbyid', (req, res) => {
	const find_id = req.body.id;
	connection.then((db) => {
	  db.collection('SellerProduct').findOne({ _id: new mongo.ObjectId(find_id) }).then((results) => {
		res.json(results);
	  });
	});
  });

app.post('/updateproduct', (req, res) => {
	const { id, product, description, minamount, date, category } = req.body;
	const images = req.files && Object.values(req.files);
   
	connection.then((db) => {
		const details = {
			ProductName: product,
			Description: description,
			Minamount: minamount,
			Date: date,
			Category: category,
		};
  
		if (images && images.length > 0) {
			details.Images = images.map(file => file.name);

			images.forEach(file => {
				file.mv("./public/" + file.name);
			});
		}

		db.collection('SellerProduct').updateOne({ _id: new mongo.ObjectId(id) }, { $set: details }).then((result) => {
			res.json({ success: true, message: 'Product updated successfully' });
		}).catch((error) => {
			console.error('Error updating product:', error);
			res.status(500).json({ success: false, message: 'Internal server error' });
		});
	});
});

app.post('/updateauction/:id', async (req, res) => {
	const productId = req.params.id;
	const { auctionDate, startTime, endTime } = req.body;
  
	try {
	  const db = await connection;
	  const result = await db.collection('SellerProduct').updateOne(
		{ _id: new mongo.ObjectId(productId) },
		{ $set: { AuctionDate: auctionDate, StartTime: startTime, EndTime: endTime } }
	  );
  
	  res.json(result);
	} catch (error) {
	  console.error('Error updating auction details:', error);
	  res.status(500).json({ success: false, message: 'Internal server error' });
	}
  });

  app.post('/scheduleall', async (req, res) => {
    try {
        const { category, auctionDate, startTime, endTime } = req.body;
        await connection.then(async (db) => {
            const Product = db.collection('SellerProduct');

            await Product.updateMany(
                { Category: category, BidAmount: { $exists: false } },
                { $set: { AuctionDate: auctionDate, StartTime: startTime, EndTime: endTime } }
            );
        });

        res.status(200).json({ message: `Scheduled all products in ${category}` });
    } catch (error) {
        console.error('Error scheduling all products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  app.post('/submitbid/:id/:amount', async (req, res) => {
    const productId = req.params.id;
    const bidAmount = parseFloat(req.params.amount);
    const bidderName = req.body.bidderName;

    try {
        const db = await connection;
        const product = await db.collection('SellerProduct').findOne({ _id: new mongo.ObjectId(productId) });

        const minAmount = parseInt(product.Minamount, 10);
        if (bidAmount <= minAmount) {
            return res.status(400).json({ success: false, message: 'Bid amount must be greater than the minimum bid amount' });
        }

        if (bidAmount <= product.BidAmount) {
            return res.status(400).json({ success: false, message: 'Bid amount must be greater than the previous bid amount' });
        }

        const newBid = { bidderName, bidAmount };

        const result = await db.collection('SellerProduct').updateOne(
            { _id: new mongo.ObjectId(productId) },
            {
                $push: {
                    bids: {
                        $each: [newBid],
                        $sort: { bidAmount: -1 } 
                    }
                },
                $set: { BidAmount: bidAmount, BidderName: bidderName }
            }
        );

        res.json({ success: true, message: 'Bid submitted successfully' });
    } catch (error) {
        console.error('Error submitting bid:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get('/logout', (req, res) => {
    if (req.session) {
        console.log('Session exists. Destroying session...',req.session);
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            } else {
                console.log('Session destroyed successfully.');
            }
            res.redirect('/');
        });
    } else {
        console.log('No session found.');
        res.redirect('/');
    }
});

  app.post('/viewprofilebyid', (req, res) => {
	let find_id = req.body.id;
	connection.then((db) => {
		db.collection('Register').findOne({ _id: new mongo.ObjectId(find_id) }).then((results) => {
			res.json(results)
		})
	})
})

app.get('/viewprofile', (req, res) => {
	connection.then((db) => {
	  db.collection('Register').find({}).toArray()
		.then((result) => {
		  res.json(result);
		})
	});
  });

  app.post('/insertOrUpdateProfile', async (req, res) => {
	try {
	  let infoId = req.body.id;
	  if (ObjectId.isValid(infoId)) {
		let details = {
		name: req.body.name,
		  email: req.body.email,
		  address: req.body.address,
		  mobile: req.body.mobile,
		  image: req.files?.image.name,
		};
  
		let info = '';
  
		if (req.files?.image) {
		  info = {
			name: details.name,
			email: details.email,
			address: details.address,
			mobile: details.mobile,
			image: details.image,
		  };
		  let fileupload = req.files.image;
		  fileupload.mv('./public/' + details.image);
		} else {
		  info = {
			name: details.name,
			email: details.email,
			address: details.address,
			mobile: details.mobile,
		  };
		}
  
		connection.then((db) => {
		  db.collection('Register').updateOne({ _id: new mongo.ObjectId(infoId) }, { $set: info }).then((result) => {
			res.json(info);
		  });
		});
	  } else {
		res.status(400).json({ success: false, message: 'Invalid ObjectId' });
	  }
	} catch (error) {
	  console.error('Error inserting/updating seller profile:', error);
	  res.status(500).json({ success: false, message: 'Internal server error' });
	}
  });

  app.get('/adminuser', (req, res) => {
	connection.then((db) => {
	  db.collection('Register').find({}).toArray()
		.then((result) => {
		  res.json(result);
		})
	});
  });

  app.post('/categoryinsert', (req, res) => {
	let details = {
		Categoryname :req.body.category,
	}
	connection.then((db) => {
		db.collection('Category').insertOne(details).then((result) => {
			res.json(result)
			console.log(result)
		})
	})
}) 
  
app.put('/updatePaymentStatus/:id', async (req, res) => {
	try {
	  const productId = req.params.id;
	  const db = await connection;
	  const updateResult = await db.collection('SellerProduct').updateOne(
		{ _id: new mongo.ObjectId(productId) },
		{ $set: { paymentStatus: req.body.paymentStatus } }
	  );
  
	  res.json({ success: true, message: 'Payment status updated successfully' });
	} catch (error) {
	  console.error('Error updating payment status:', error);
	  res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
  });
app.listen(4000)






















