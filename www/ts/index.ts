/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * 
 * This file has been modified from its original licensed state.
 */
 
const nav = document.getElementById('nav')!;
const sections = document.getElementById('main')!.children;
const serverAddress = 'http://47.144.142.202';

[...sections].forEach((e, i) => {
    // e.id = e.id || 'section-' + (i + 1);
    const link = document.createElement('div');
    link.classList.add('section-button');
    link.appendChild(document.createTextNode((<HTMLElement>e.getElementsByTagName('H2')[0]).innerText ?? 'unknown'));
    link.onclick = () => {
        [...sections].forEach(e => e.classList.remove('selected'));
        e.classList.add('selected');
    };
    nav.appendChild(link);
});

let authStr: string;

interface LoginForm extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
    output: HTMLTextAreaElement;
}

document.getElementById('login')!.addEventListener('submit', event => {
    const form = <HTMLFormElement>event.target;
    const controlElements = <LoginForm>form.elements
    fetch(serverAddress + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: controlElements.username.value,
            password: controlElements.password.value
        })
    })
    .then((response) => {
        // Handle the response
        authStr = btoa(controlElements.username.value + ':' + controlElements.password.value);
        response.text().then(e => controlElements.output.value = e);
        setTimeout(() => form.style.display = 'none', 1000);
    })
    // .catch((error) => {
    //     // Handle the error
    // });
    event.preventDefault();
})

interface AddForm extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    value: HTMLInputElement;
    output: HTMLTextAreaElement;
}

document.getElementById('add')!.addEventListener('submit', event => {
    const form = <HTMLFormElement>event.target;
    const controlElements = <AddForm>form.elements
    fetch(serverAddress + '/data', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authStr}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            [controlElements.name.value]: controlElements.value.value
        })
    })
    .then((response) => {
        // Handle the response
        form.reset();
        response.text().then(e => controlElements.output.value = e);
    })
    // .catch((error) => {
    //     // Handle the error
    // });
    event.preventDefault();
})

interface GetForm extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    output: HTMLTextAreaElement;
}

document.getElementById('get')!.addEventListener('submit', event => {
    const form = <HTMLFormElement>event.target;
    const controlElements = <GetForm>form.elements
    fetch(serverAddress + '/data' + (controlElements.name.value == '' ? '' : '?path=' + controlElements.name.value), {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${authStr}`,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        // Handle the response
        response.text().then(e => controlElements.output.value = e);
    })
    // .catch((error) => {
    //     // Handle the error
    // });
    event.preventDefault();
})

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready')!.classList.add('ready');
}
