import fetch from 'cross-fetch';

describe('Test [GET /benchmark]', () => {

  const url = 'http://localhost:8080/benchmark';

  it('[GET /benchmark]\n\tshould return 200 and "Hello, world!"', async () => {
    const response = await fetch(url, { method: 'GET' });
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/text\/plain/);
    expect(await response.text()).toEqual('Hello, world!');
  });

});
