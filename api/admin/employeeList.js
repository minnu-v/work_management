const router = require("express").Router();
const authorize = require("../../config/authorize");
const pool = require("../../config/db");


router.get("/employeeList", authorize, async (req, res) => 
 {
  try 
  {

    const page = req.query.page
    const limit = req.query.limit

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const users = await pool.query(
      "SELECT (emp_id,first_name,last_name,user_status) FROM employee_info"
    );

    const list=users.rows

    const result = list.slice(startIndex, endIndex)
    res.json(result);

  } 
  catch (err) 
  {
    console.error(err.message);
    res.status(500).send("Server error");
  }
 }
 );

module.exports = router;