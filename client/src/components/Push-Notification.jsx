if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
      subscribeToPush();
    })
    .catch(function (error) {
      console.error("Service Worker registration failed:", error);
    });
}
const subscribeToPush = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BNlSuaicW0_l4LG__BMqjDKNNgBbQwjz9UN9_7K5vd0FXwRu2wEY_EW3tOZlis7TB6Mnktfr9YTodvXmKYHKVNk",
    });

    const response = await fetch("http://localhost:5001/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

subscribeToPush();
