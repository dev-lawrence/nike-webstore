import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationContext from '../NotificationContext';

const Notification = () => {
  const { notify } = useContext(NotificationContext);

  return (
    <>
      <AnimatePresence>
        {notify && (
          <motion.div
            initial={{ opacity: 0, top: -100 }}
            animate={{ opacity: 1, top: 30 }}
            exit={{ opacity: 0, top: -100 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="notify"
          >
            <p> ✅ {notify} </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Notification;
