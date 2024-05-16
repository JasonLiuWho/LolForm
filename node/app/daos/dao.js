const con = require("../config/dbconfig")

const dao = {
    findAll: (req, res) => {
        con.execute(
            `SELECT * FROM champ;`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log("DAO ERROR:", error)
                }
            }
        )
    },

    findById: (req, res, id)=> {
        con.execute(
            `SELECT * FROM champ WHERE champ_id = ${id};`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log ("DAO ERROR:", error)
                }
            }
        )
    },

    sort: (req, res)=> {
        con.execute(
            `SELECT * FROM champ ORDER BY champName, champRole;`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log("DAO ERROR:", error)
                }
            }
        )
    },

    create: (req, res)=> {
        if (Object.Keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `INSERT INTO champ SET ${fields.join(' =?, ')}=?;`,
                values,
                (error, dbres)=> {
                    if(!error) {
                        res.json({
                            Last_id: dbres.insertid
                        })
                    } else {
                        console.log("DAO ERROR:", error)
                    }
                }
            )
        }
    }
}

module.exports = dao