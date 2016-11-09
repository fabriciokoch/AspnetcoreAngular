using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebApp;

namespace Test {
  public class TestServerFixture : IDisposable {
    private TestServer testServer;
    protected TestServer TestServer {
      get {
        if (testServer == null) {
          testServer = new TestServer(new WebHostBuilder().UseStartup<Startup>());
        }
        return testServer;
      }
    }

    public HttpClient Client {
      get {
        return TestServer.CreateClient();
      }
    }
    public void Dispose() {
      if (testServer != null) {
        testServer.Dispose();
        testServer = null;
      }
    }
  }
}
