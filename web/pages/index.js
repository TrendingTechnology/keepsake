import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import CodeBlock from "../components/code-block";
import Footer from "../components/footer";
import Header from "../components/header";
import Layout from "../layouts/default";

export default function Home() {
  let _num = 1;

  function num() {
    let s = _num + "";
    _num += 1;
    if (s.length < 2) {
      s = "0" + s;
    }
    return s;
  }

  return (
    <Layout
      wholeTitle="Keepsake – Version control for machine learning"
      description="Automatically track your experiments and models with two lines of code. Open source and community-built."
    >
      <Header className="homepage">
        <Head>
          {/* "machine learning" doesn't quite fit in twitter card */}
          <meta
            property="twitter:title"
            key="twitter:title"
            content="Keepsake – Version control for ML"
          />
        </Head>
        <section className="cta">
          <h2>
            Lightweight
            <abbr title=" and">
              <span>,</span>
            </abbr>{" "}
            open source
          </h2>
          <p>
            <Link href="/docs">Get started</Link>{" "}
            <a href="#manifesto">Get involved</a>{" "}
            <iframe
              src="https://ghbtns.com/github-btn.html?user=replicate&amp;repo=keepsake&amp;type=star&amp;count=true&amp;size=large"
              frameBorder="0"
              scrolling="0"
              width="170"
              height="30"
              title="GitHub"
            ></iframe>
          </p>
        </section>
        <section className="info">
          <div>
            <h2>
              <span>{num()}</span> Never lose your work
            </h2>
            <p>
              Train as usual, and Keepsake will automatically save your code and
              weights to Amazon S3 or Google Cloud Storage.
            </p>
          </div>
          <div>
            <h2>
              <span>{num()}</span> Go back in time
            </h2>
            <p>
              Get back the code and weights from any checkpoint if you need to
              re-train or get the model weights out.
            </p>
          </div>
          <div>
            <h2>
              <span>{num()}</span> Toward reproducibility
            </h2>
            <p>
              It is really hard to run and re-train ML models. We are working to
              fix that, but{" "}
              <a href="#manifesto">we need your help to make it a reality</a>.
            </p>
          </div>
        </section>
      </Header>

      <section className="terminal">
        <div>
          <h2>
            <span>{num()}</span> How it works
          </h2>
          <p>
            Just add two lines of code. You don’t need to change how you work.
          </p>
          <p>
            Keepsake is a Python library that uploads files and metadata (like
            hyperparameters) to Amazon S3 or Google Cloud Storage.
          </p>
          <p>
            You can get the data back out using the command-line interface or a
            notebook.
          </p>
        </div>
        <div className="windowChrome">
          {/* Desktop */}
          <CodeBlock
            language="python"
            copyButton={false}
            className="sm-hidden"
          >{`import torch
import keepsake

def train():
    #highlight-start
    # Save training code and hyperparameters
    experiment = keepsake.init(path=".", params={...})
    #highlight-end
    model = Model()

    for epoch in range(num_epochs):
        # ...

        torch.save(model, "model.pth")
        #highlight-start
        # Save model weights and metrics
        experiment.checkpoint(path="model.pth", metrics={...})
        #highlight-end`}</CodeBlock>
          {/* Mobile */}
          <CodeBlock
            language="python"
            copyButton={false}
            className="hidden sm-block"
          >{`import torch
import keepsake

def train():
    #highlight-start
    # Save training code and params
    experiment = keepsake.init(
        path=".",
        params={...},
    )
    #highlight-end
    model = Model()

    for epoch in range(num_epochs):
        # ...

        torch.save(model, "model.pth")
        #highlight-start
        # Save model weights and metrics
        experiment.checkpoint(
            path="model.pth",
            metrics={...},
        )
        #highlight-end`}</CodeBlock>
        </div>
      </section>

      <section className="control">
        <div>
          <h2>
            <span>{num()}</span> Open source &amp; community-built
          </h2>
          <p>
            We’re trying to pull together the ML community so we can build this
            foundational piece of technology together.{" "}
            <a href="#manifesto">Learn more.</a>
          </p>
        </div>
        <div>
          <h2>
            <span>{num()}</span> It's just plain old files on S3
          </h2>
          <p>
            All the data is stored on your own Amazon S3 or Google Cloud Storage
            as tarballs and JSON files. There’s no server to run.{" "}
            <a href="/docs/guides/cloud-storage">Learn more.</a>
          </p>
        </div>
        <div>
          <h2>
            <span>{num()}</span> Works with&nbsp;everything
          </h2>
          <p>
            Tensorflow, PyTorch, scikit-learn, XGBoost, you name it. It’s just
            saving files and dictionaries – export however you want.
          </p>
        </div>
      </section>

      <section className="docs homepage" id="features">
        <nav>
          <ol>
            <li>
              <h2>
                <span>{num()}</span> Features
              </h2>
              <ol>
                <li>
                  <a href="#anchor-1">Throw away your spreadsheet</a>
                </li>
                <li>
                  <a href="#anchor-3">Analyze in a notebook</a>
                </li>
                <li>
                  <a href="#anchor-2">Compare experiments</a>
                </li>
                <li>
                  <a href="#anchor-4">Get back your code and weights</a>
                </li>
                <li>
                  <a href="#anchor-5">Load models for inference</a>
                </li>
                <li>
                  <a href="#anchor-6">A platform to build upon</a>
                </li>
              </ol>
            </li>
          </ol>
        </nav>
        <div className="body">
          <h3 id="anchor-1">Throw away your spreadsheet</h3>
          <p>
            Your experiments are all in one place, with filter and sort. Because
            the data’s stored on S3, you can even see experiments that were run
            on other machines.
          </p>
          <CodeBlock language="shell-session">
            {`$ keepsake ls --filter "val_loss<0.2"
EXPERIMENT   HOST         STATUS    BEST CHECKPOINT
e510303      10.52.2.23   stopped   49668cb (val_loss=0.1484)
9e97e07      10.52.7.11   running   41f0c60 (val_loss=0.1989)`}
          </CodeBlock>

          <h3 id="anchor-3">Analyze in a notebook</h3>
          <p>
            Don’t like the CLI? No problem. You can get all your experiments out
            and do meta-analysis on your results from within a notebook.{" "}
            <a href={process.env.ANALYSIS_COLAB_URL} target="_blank">
              Learn more.
            </a>
          </p>
          <img src="images/notebook.png" width="700" />

          <h3 id="anchor-2">Compare experiments</h3>
          <p>
            It diffs everything, all the way down to versions of dependencies,
            just in case that latest Tensorflow version did something weird.
          </p>
          <CodeBlock language="shell-session">
            {`$ keepsake diff 49668cb 41f0c60
Checkpoint:       49668cb     41f0c60
Experiment:       e510303     9e97e07

Params
learning_rate:    0.001       0.002

Python Packages
tensorflow:       2.3.0       2.3.1

Metrics
train_loss:       0.4626      0.8155
train_accuracy:   0.7909      0.7254
val_loss:         0.1484      0.1989
val_accuracy:     0.9607      0.9411`}
          </CodeBlock>

          <h3 id="anchor-4">Get back your code and weights</h3>
          <p>
            Keepsake lets you get back to any point you called{" "}
            <code>experiment.checkpoint()</code> so, you can re-train models and
            get your model weights out.
          </p>
          <CodeBlock language="shell-session">
            {`$ keepsake checkout f81069d
Copying code and weights to working directory...

If you want to run this experiment again, this is how it was run:
  python train.py --learning_rate=0.2`}
          </CodeBlock>

          <h3 id="anchor-5">Load models for inference</h3>
          <p>
            You can load a specific version of your model in Python to run
            inferences – either{" "}
            <a href={process.env.ANALYSIS_COLAB_URL} target="_blank">
              from within a notebook
            </a>{" "}
            or{" "}
            <a href="/docs/guides/inference">
              from another program running inferences
            </a>
            .{" "}
          </p>
          <img src="images/inference.png" width="700" />

          <h3 id="anchor-6">A platform to build upon</h3>
          <p>
            Keepsake is intentionally lightweight and doesn’t try to do too
            much. Instead, we give you{" "}
            <a href="/docs/reference/python">Python</a> and{" "}
            <a href="/docs/reference/cli">command-line</a> APIs so you can
            integrate it with your own tools and workflow.
          </p>
        </div>
      </section>
      {/*
      <section className="fullWidth">
        <h2>
          <span>{num()}</span> Video
        </h2>
        <div class="video-container">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/ZtfkymtavUE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </section>
      <section className="comparison">
        <h2><span>{num()}</span> Analyse results however you want</h2>
        <div>
          <h3>Trash your spreadsheet</h3>
          <CodeBlock language="shell-session">
            {`$ keepsake ls --filter "val_loss<0.2"
EXPERIMENT   HOST         STATUS    BEST CHECKPOINT
e510303      10.52.2.23   stopped   49668cb (val_loss=0.1484)
9e97e07      10.52.7.11   running   41f0c60 (val_loss=0.1989)`}
          </CodeBlock>
          <p>Your experiments are all in one place, with filter and sort. Because the data's stored on S3, you can even see experiments that were run on other machines.</p>
          <p>Your experiments are all in one place, with filter and sort. Because the data's stored on S3, you can even see experiments that were run on other machines.</p>
        </div>
        <div>
          <h3>Or use a notebook</h3>
          <img src="images/notebook.png" width="900" />
           <p>Don't like the CLI? No problem. You can retrieve, analyze, and plot your results from within a notebook. Think of it like a programmable Tensorboard.</p>
          <p>Don't like the CLI? No problem. You can retrieve, analyze, and plot your results from within a notebook. Think of it like a programmable Tensorboard.</p>
       </div>
      </section>
      */}
      <section className="homepage-cta">
        <div>
          <h2>
            <Link href="/docs">
              <a className="button">Get started</a>
            </Link>
          </h2>
        </div>
        <div> or, </div>
        <div>
          <Link href="/docs/learn/how-it-works">
            <a>learn more about how Keepsake works</a>
          </Link>
        </div>
      </section>
      <Footer></Footer>
    </Layout>
  );
}
