const request = {
    fetchDo: `http://localhost:3000/fazer`,
    fetchProgress: `http://localhost:3000/andamento`,
    fetchConcluded: ` http://localhost:3000/concluido`,
    fetchPeople: `http://localhost:3000/people`,
};

const fetchData = async () => {
    const [Do, Progress, Concluded, People] = await Promise.all([
        fetch(request.fetchDo, { timeout: 10000 }).then((res) => res.json()),
        fetch(request.fetchProgress, { timeout: 10000 }).then((res) =>
            res.json()
        ),
        fetch(request.fetchConcluded, { timeout: 10000 }).then((res) =>
            res.json()
        ),
        fetch(request.fetchPeople, { timeout: 10000 }).then((res) =>
            res.json()
        ),
    ]);
    return {
        Do: Do,
        Progress: Progress,
        Concluded: Concluded,
        People: People,
    };
};

export default fetchData;
