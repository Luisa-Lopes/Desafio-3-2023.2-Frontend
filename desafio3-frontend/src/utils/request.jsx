const handlePost = async (url, inputs) => {
    try {
        const response = await fetch(`http://localhost:3000/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });

        if (response.ok) {
            console.log("Post successful!");
            // Faça algo com a resposta, se necessário
        } else {
            console.error("Failed to post:", response.status);
        }
    } catch (error) {
        console.error("Error posting data:", error);
    }
};

const handleDelete = async (id, url) => {
    try {
        const response = await fetch(`http://localhost:3000/${url}/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log("Item excluído com sucesso!");
            // Atualize seu estado ou faça qualquer outra coisa após a exclusão bem-sucedida
        } else {
            console.error("Falha ao excluir item:", response.status);
        }
    } catch (error) {
        console.error("Erro ao excluir item:", error);
    }
};

export { handleDelete, handlePost };
