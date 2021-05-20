import axios from "axios"
import {base64decode} from "nodejs-base64"

const githubApiClient = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 10000,
    headers: {
        Accept: "application/json",
        Authorization: "token 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"
    }
});

const gitRootPath = "omprakashsridharan/version-it"

export function createFile(params: { username: string, filename: string, content: string, sha?: string }) {
    return new Promise<void>(async (resolve, reject) => {
        const {username, filename, content, sha} = params
        const data: {
            message: string,
            content: string,
            sha?: string
        } = {
            message: new Date().toISOString(),
            content: content
        }
        if (sha) {
            try {
                data.sha = await getContentSha({username, filename, sha}).then()
            } catch (e) {
                reject("Could not create file")
            }
        }
        githubApiClient.put(`/repos/${gitRootPath}/contents/${username}/${filename}?accept=application/vnd.github.v3+json`, data).then(_ => {
            resolve()
        }).catch(_ => {
            reject("Could not create file")
        })
    })

}

export function getFileHistory(params: { username: string, filename: string }) {
    return new Promise<Array<{ commit: string, sha: string }>>(async (resolve, reject) => {
        const {username, filename} = params
        githubApiClient.get<Array<{ commit: { message: string }, sha: string }>>(`/repos/${gitRootPath}/commits`, {
            params: {
                path: `${username}/${filename}`
            }
        }).then(apiRes => {
            resolve(apiRes.data.map(c => {
                return {
                    commit: c.commit.message,
                    sha: c.sha
                }
            }))
        }).catch(_ => {
            reject("Could not get commits")
        })
    })

}

export function getContentSha(params: { username: string, filename: string, sha: string }) {
    const {username, filename, sha: shaString} = params
    return new Promise<string>((resolve, reject) => {
        githubApiClient.get<{ sha: string }>(`/repos/${gitRootPath}/contents/${username}/${filename}?ref=${shaString}`)
            .then(apiRes => {
                resolve(apiRes.data.sha)
            }).catch(_ => {
            reject()
        })
    })
}

export function getFileContent(params: { username: string, filename: string, sha: string }) {
    return new Promise<string>((resolve, reject) => {
        const {username, filename, sha} = params
        githubApiClient.get<{ content: string }>(`/repos/${gitRootPath}/contents/${username}/${filename}?ref=${sha}`)
            .then(apiRes => {
                resolve(base64decode(apiRes.data.content))
            }).catch(_ => {
            reject("Could not get content")
        })
    })

}

