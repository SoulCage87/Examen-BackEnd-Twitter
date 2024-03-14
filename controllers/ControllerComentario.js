import { db } from "../db/conn.js";

const getComentario = async (req, res) => {
    try {
        const publicacion_id = req.params.publicacion_id;

        const sql = `
            SELECT usuario, comentario
            FROM tbl_comentario
            WHERE publicacion_id = $1
        `;

        const result = await db.query(sql, [publicacion_id]);
        res.json(result.rows);
    } catch (e) {
        res.status(500).json(e.message);
    }
};


const deleteComentario = async (req, res) => {
    try {
        const params = [req.params.id]

        const sql = `UPDATE tbl_comentario
               SET activo = false
               WHERE id = $1
               RETURNING 'Comentario borrado' mensaje`

        const result = await (db.query(sql, params))
        res.json(result);


    } catch (e) {
        res.status(500).json(e.message)
    }
}

const postComentario = async (req, res) => {
    try {
        const { id_publicacion, nombre_usuario } = req.params 

        const { comentario } = req.body

        const params = [comentario, id_publicacion, nombre_usuario]

        const sql = `INSERT INTO tbl_comentario
        (comentario,publicacion_id,usuario)
        VALUES
        ($1,$2,$3) RETURNING comentario, publicacion_id`

        const result = await db.query(sql, params)

        res.json(result)
    } catch (e) {
        res.status(500).json(e.message)
    }
}


export { getComentario, deleteComentario, postComentario }